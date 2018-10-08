/*
 * Copyright (C) 2017  Ben Ockmore
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import * as bootstrap from 'react-bootstrap';
import * as entityHelper from '../../../helpers/entity';

import EntityFooter from './footer';
import EntityImage from './image';
import EntityLinks from './links';
import EntityTitle from './title';
import PropTypes from 'prop-types';
import React from 'react';


const {extractAttribute, getTypeAttribute, getEntityUrl} = entityHelper;
const {Col, Row} = bootstrap;


function AuthorAttributes({author}) {
	const type = getTypeAttribute(author.authorType).data;
	const gender = extractAttribute(author.gender, 'name');
	const beginArea = extractAttribute(author.beginArea, 'name');
	const endArea = extractAttribute(author.endArea, 'name');
	const beginDate = extractAttribute(author.beginDate);
	const endDate = extractAttribute(author.endDate);

	return (
		<div>
			<Row>
				<Col md={3}>
					<dl>
						<dt>Type</dt>
						<dd>{type}</dd>
					</dl>
				</Col>
				<Col md={3}>
					<dl>
						<dt>Gender</dt>
						<dd>{gender}</dd>
					</dl>
				</Col>
				<Col md={3}>
					<dl>
						<dt>Begin Date</dt>
						<dd>{beginDate}</dd>
						<dt>Begin Area</dt>
						<dd>{beginArea}</dd>
					</dl>
				</Col>
				{
					author.ended &&
					<Col md={3}>
						<dl>
							<dt>End Date</dt>
							<dd>{endDate}</dd>
							<dt>End Area</dt>
							<dd>{endArea}</dd>
						</dl>
					</Col>
				}
			</Row>
		</div>
	);
}
AuthorAttributes.displayName = 'AuthorAttributes';
AuthorAttributes.propTypes = {
	author: PropTypes.object.isRequired
};


function AuthorDisplayPage({entity, identifierTypes}) {
	const urlPrefix = getEntityUrl(entity);
	return (
		<div>
			<Row className="entity-display-background">
				<Col className="entity-display-image-box text-center" md={2}>
					<EntityImage
						backupIcon="user"
						imageUrl={entity.imageUrl}
					/>
				</Col>
				<Col md={10}>
					<EntityTitle entity={entity}/>
					<AuthorAttributes author={entity}/>
				</Col>
			</Row>
			<EntityLinks
				entity={entity}
				identifierTypes={identifierTypes}
				urlPrefix={urlPrefix}
			/>
			<hr className="margin-top-d40"/>
			<EntityFooter
				entityUrl={urlPrefix}
				lastModified={entity.revision.revision.createdAt}
			/>
		</div>
	);
}
AuthorDisplayPage.displayName = 'AuthorDisplayPage';
AuthorDisplayPage.propTypes = {
	entity: PropTypes.object.isRequired,
	identifierTypes: PropTypes.array
};
AuthorDisplayPage.defaultProps = {
	identifierTypes: []
};

export default AuthorDisplayPage;
