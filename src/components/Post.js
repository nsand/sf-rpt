import React from 'react';
import { date } from '../services/i18n';

/**
 * This component represents a post and displays it accordingly, allowing for editing and deleting
 * of the post as well
 * @param {String} title the post title
 * @param {String} text the post text
 * @param {String} timestamp the date represented as a string
 * @param {Number} id the id of the post
 * @param {Function} onEdit the callback for editing
 * @param {Function} onDelete the callback for deleting
 */
export default ({ title, text, timestamp, id, onEdit, onDelete }) => {
	return (
		<section id={id} className="sf--post">
			<div className="sf--post__timestamp">{date(timestamp)}</div>
			<h2 className="sf--post__header">{title}</h2>
			<p>{text}</p>
			<div className="sf--post__footer">
				<a className="sf--post__action" href="#" onClick={onEdit}>Edit</a>
				<a className="sf--post__action" href="#" onClick={onDelete}>Delete</a>
			</div>
		</section>
	)
};
