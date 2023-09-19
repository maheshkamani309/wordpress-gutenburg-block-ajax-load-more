/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * To use wordpres default functionality
 */
import { useSelect } from '@wordpress/data';
import {
	PanelBody,
	PanelRow,
	QueryControls,
	ToggleControl,
	RangeControl,
	SelectControl
} from '@wordpress/components';
import { RawHTML } from '@wordpress/element';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { postType, postPerPage, displayThumbnail, listType, columns } = attributes;

	const { postTypes, posts } = useSelect(
		(select) => {
			// get post types and filter it
			const registeredpostTypes = select('core').getPostTypes({ filter: { viewable: false }, per_page: -1 });
			const filterpostTypes = registeredpostTypes != null ? registeredpostTypes.filter(type => type.viewable === true) : [];
			const postTypes = filterpostTypes.map((item) => ({
				label: item.name,
				value: item.slug
			}));

			const posts = select('core').getEntityRecords('postType', postType, {
				'per_page': postPerPage,
				'_embed': true
			});
			return {
				postTypes: postTypes,
				posts: posts
			}
		},
		[postType, postPerPage]
	);
	console.log(listType)
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Post Type', 'ajax-load-more')}>
					<SelectControl
						label={__('Select Post Type')}
						value={postType}
						options={postTypes}
						onChange={(value) => {
							setAttributes({
								postType: value,
							});
						}}
					/>
					<SelectControl
						label={__('View Type', 'ajax-load-more')}
						value={listType}
						options={
							[
								{ value: 'list', label: __('List', 'ajax-load-more') },
								{ value: 'grid', label: __('Grid', 'ajax-load-more') }
							]
						}
						onChange={(value) => {
							setAttributes({
								listType: value,
							});
						}}
					/>
					{

						listType == 'grid' ? (
							<RangeControl
								label={__('Number of Columns', 'ajax-load-more')}
								value={columns}
								onChange={(value) =>
									setAttributes({ columns: value })
								}
								min={1}
								max={4}
								required
							/>
						) : ('')
					}
					<QueryControls
						numberOfItems={postPerPage}
						onNumberOfItemsChange={(value) =>
							setAttributes({ postPerPage: value })
						}
						minItems={1}
						maxItems={20}
					/>

					<PanelRow>
						<ToggleControl
							label={__('Show Featured Image', 'ajax-load-more')}
							checked={displayThumbnail}
							onChange={() =>
								setAttributes({ displayThumbnail: !displayThumbnail })
							}
						/>
					</PanelRow>

				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<div className='mak-ajax-load-more'>
					<ul className={`mak-ajax-load-more-posts-list  ${listType} ${listType == 'grid' ? 'columns-' + columns : ''}`}>
						{posts && posts.map((post) => {
							return (
								<li key={post.id}>
									{
										displayThumbnail &&
										post._embedded &&
										post._embedded['wp:featuredmedia'] &&
										post._embedded['wp:featuredmedia'][0] &&
										<img
											className='wp-block-author-box-ajax-load-more__post-thumbnail'
											src={post._embedded['wp:featuredmedia'][0].source_url}
											alt={post._embedded['wp:featuredmedia'][0].alt_text}
										/>
									}
									<h2>
										<a href={post.link}>
											{
												post.title.rendered ? (
													<RawHTML>
														{post.title.rendered}
													</RawHTML>
												) : (
													$(post.title.raw)
												)
											}
										</a>
									</h2>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</>
	);
}
