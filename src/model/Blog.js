import axios from 'axios';

const API = '/api/';

/**
 * The model representing the state of the blog
 */
export default class Blog {
	posts = []
	subscribers = []
	/**
	 * Subscribes to changes to the model
	 * @param {Function} subscriber the subscriber function that will be invoked when there are changes to the model
	 */
	subscribe(subscriber) {
		this.subscribers.push(subscriber);
	}
	/**
	 * Notifies subscribers of changes to the model
	 */
	notify() {
		this.subscribers.forEach(subscriber => setTimeout(subscriber));
	}

	/**
	 * Gets all posts from the server
	 * @return {Promise} a promise that is resolved when the request finishes
	 */
	query() {
		return axios.get(API).then((resp) => {
			if (resp.status < 400) {
				this.posts = resp.data;
				this.notify();
			}
			else {
				throw new Error(resp.data);
			}
		});
	}

	/**
	 * Creates a new post, and upon success, adds it to the array of posts
	 * @param {Object} post the post to create, requires text and title fields
	 * @return {Promise} a promise that is resolved when the request finishes
	 */
	create(post) {
		return axios.post(`${API}`, post).then((resp) => {
			if (resp.status < 400) {
				// Add the created post to the posts array
				this.posts = [].concat(resp.data, this.posts);
				this.notify();
			}
			else {
				throw new Error(resp.data);
			}
		});
	}

	/**
	 * Deletes the post and updates the posts array
	 * @param {Object} post the post to delete
	 * @return {Promise} a promise that is resolved when the request finishes
	 */
	delete(post) {
		return axios.delete(`${API}${post.id}`).then((resp) => {
			if (resp.status < 400) {
				this.posts = this.posts.filter(item => post.id !== item.id);
				this.notify();
			}
			else {
				throw new Error(resp.data);
			}
		});
	}

	/**
	 * Updates the post and updates the posts array
	 * @param {Object} post the post to update
	 * @return {Promise} a promise that is resolved when the request finishes
	 */
	update(post) {
		return axios.post(`${API}${post.id}`, post).then((resp) => {
			if (resp.status < 400) {
				// Iterate over the existing posts to find the one we should update
				this.posts = this.posts.map((item) => {
					if (item.id === post.id) {
						// Found the existing item, update it
						return {
							...item,
							...post
						};
					}
					return item;
				})
				this.notify();
			}
			else {
				throw new Error(resp.data);
			}
		});
	}
}