import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';
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
import { format } from 'date-fns';

export default function Edit({ attributes, setAttributes }) {
	const { postType, postPerPage, displayThumbnail, displayDates, displayExcerpt, infinateScroll, listType, columns } = attributes;

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

					<QueryControls
						numberOfItems={postPerPage}
						onNumberOfItemsChange={(value) =>
							setAttributes({ postPerPage: value })
						}
						minItems={1}
						maxItems={20}
					/>

				</PanelBody>
				<PanelBody title={__('Template Settings', 'ajax-load-more')}>
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


					<PanelRow>
						<ToggleControl
							label={__('Show Featured Image', 'ajax-load-more')}
							checked={displayThumbnail}
							onChange={() =>
								setAttributes({ displayThumbnail: !displayThumbnail })
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Show Dates', 'ajax-load-more')}
							checked={displayDates}
							onChange={() =>
								setAttributes({ displayDates: !displayDates })
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Show Excerpt', 'ajax-load-more')}
							checked={displayExcerpt}
							onChange={() =>
								setAttributes({ displayExcerpt: !displayExcerpt })
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Infinate Scroll', 'ajax-load-more')}
							checked={infinateScroll}
							onChange={() =>
								setAttributes({ infinateScroll: !infinateScroll })
							}
						/>
					</PanelRow>

				</PanelBody>
			</InspectorControls >
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
											className='wp-block-author-box-ajax-load-more__post-thumbnail malm-thumbnail'
											src={post._embedded['wp:featuredmedia'][0].source_url}
											alt={post._embedded['wp:featuredmedia'][0].alt_text}
										/>
									}
									<div className='malm-content'>
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
										{
											displayDates &&
											post.date &&
											<p className='malm-date'>
												{format(new Date(Date.parse(post.date)), 'MMMM dd, yyyy')}
											</p>
										}

										{
											displayExcerpt &&
											post.excerpt &&
											post.excerpt?.rendered &&
											<RawHTML>
												{post.excerpt?.rendered}
											</RawHTML>
										}
									</div>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</>
	);
}
