import React from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

const getParentLink = (parentName: string | null, people: Person[]) => {
  if (!parentName) {
    return '-';
  }

  const parent = people.find(p => p.name === parentName);

  if (parent && parent.sex === 'f') {
    return (
      <Link to={`/people/${parent.slug}`} className="has-text-danger">
        {parentName}
      </Link>
    );
  }

  if (parent) {
    return <Link to={`/people/${parent.slug}`}>{parentName}</Link>;
  }

  return parentName;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{getParentLink(person.motherName, people)}</td>
              <td>{getParentLink(person.fatherName, people)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
