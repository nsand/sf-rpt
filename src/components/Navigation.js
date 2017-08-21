import React from 'react';
import { date } from '../services/i18n';

/**
 * This component renders the nav panel
 * @param {Array} posts an array of posts
 */
export default ({ posts }) => (
	<nav className="sf--nav">
		<h2 className="sf--nav__header">Past Posts</h2>
		<ul>
			{posts.map(post => <li className="sf--nav__link" key={post.id}><a href={`#${post.id}`}>{post.title} - {date(post.timestamp)}</a></li>)}
		</ul>
	</nav>
)