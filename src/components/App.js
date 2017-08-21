import React, { Component } from 'react';
import Blog from '../model/Blog';

import Post from './Post';
import Navigation from './Navigation';
import Form from './Form';

/**
 * The main application, this is the source of truth for the posts and everything is rendered down from here
 */
export default class App extends Component {
	constructor() {
		super();
		this.blog = new Blog();
		this.state = { posts: [] };

		// Connect to the model
		this.blog.subscribe(() => {
			this.setState({
				posts: this.blog.posts,
			});
		});
	}
	componentDidMount() {
		// When we load, fetch the existing posts
		this.blog.query().catch(e => console.error(e));
	}
	/**
	 * The button for creating a new post was clicked
	 */
	onCreate = () => {
		this.setState({
			isEditing: true,
		});
	}
	/**
	 * The button for editing an existing post was clicked
	 */
	onEdit = (post) => {
		this.setState({
			isEditing: true,
			post
		});
	}
	/**
	 * Delete the specified post
	 * @param {Object} post the post to be deleted
	 */
	onDelete(post) {
		this.blog.delete(post).catch(e => console.error(e));
	}
	onCancel = () => {
		this.setState({
			isEditing: false,
			post: undefined,
		});
	}
	/**
	 * The user has initiated an action from the form, create or update a post as appropriate
	 */
	onSubmit = ({ title, text }) => {
		let request;

		if (this.state.post) {
			// If the post is in the state, we're editing
			request = this.blog.update({
				...this.state.post,
				title,
				text,
			});
		}
		else {
			// Otherwise, we're creating a new post
			request = this.blog.create({ title, text });
		}

		// Send the request; once it completes, update the UI
		request.then(() => {
			this.setState({
				isEditing: false,
				post: undefined,
			});
		}).catch(e => console.error(e));
	}

	render() {
		const {
			post,
			posts,
			isEditing,
		} = this.state;

		// If we're in editing mode, show the edit form; otherwise, show the list of posts
		const content = isEditing ? <Form {...post} onSubmit={this.onSubmit} onCancel={this.onCancel} /> :
			(
				<div className="sf--posts__list">
					{posts.map(post => <Post key={post.id} {...post} onDelete={() => this.onDelete(post)} onEdit={() => this.onEdit(post)} />)}
						<button aria-label="Create a new post" className="sf--fab" onClick={this.onCreate}><span className="sf--fab__icon">+</span></button>
				</div>
			);

		return (
			<div className="sf--app">
				<Navigation posts={posts} />
				<main className="sf--posts">
					{content}
				</main>
			</div>
		);
	}
}
