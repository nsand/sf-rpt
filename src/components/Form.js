import React, { Component } from 'react';

/**
 * @function
 * @name Form
 * This component represents both the create and edit form. It's in edit mode
 * if it receives an id; otherwise, it's in create mode
 * @param {String} title the title of the post
 * @param {String} text the text of the post
 * @param {Number} [id] the id of the post
 */
export default class Form extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			text: '',
		};
	}
	componentDidMount() {
		this.componentWillReceiveProps(this.props);
	}
	componentWillReceiveProps(props) {
		// We received some new props, update the current state with them so they show up in the input fields
		const updates = {};
		if (props.text !== this.state.text) {
			updates.text = props.text || '';
		}
		if (props.title !== this.state.title) {
			updates.title = props.title || '';
		}
		if (Object.keys(updates).length > 0) {
			this.setState(updates);
		}
	}
	/**
	 * The title changed
	 * @param {Object} e the change event
	 */
	handleTitleChange = (e) => {
		this.setState({
			title: e.target.value,
		});
	}
	/**
	 * The text changed
	 * @param {Object} e the change event
	 */
	handleTextChange = (e) => {
		this.setState({
			text: e.target.value,
		});
	}
	/**
	 * The user clicked the submit button, propagate the changes up to the application
	 */
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit({
			title: this.state.title,
			text: this.state.text,
		});
	}
	render() {
		const {
			title,
			text,
		} = this.state;
		const {
			id,
			onCancel,
		} = this.props;

		// We know we're editing if we've been given an id
		const isEdit = typeof id !== 'undefined';
		return (
			<section className="sf--form">
				<h2>{isEdit ? 'Editing' : 'New'} Post</h2>
				<form>
					<label htmlFor="title" className="sf--label">Title</label>
					<input id="title" className="sf--text-input" type="text" value={title} onChange={this.handleTitleChange} />
					<label htmlFor="text" className="sf--label">Text</label>
					<textarea id="text" className="sf--text-area" rows="5" value={text} onChange={this.handleTextChange} />
					<div className="sf--form__footer">
						<button className="sf--btn sf--btn--secondary" type="button" onClick={onCancel}>Cancel</button>
						<button className="sf--btn" type="button" disabled={!title || !text} onClick={this.handleSubmit}>{isEdit ? 'Update' : 'Create'}</button>
					</div>
				</form>
			</section>
		);
	}
};
