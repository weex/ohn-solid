import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { RootState } from '../../app/store'
import Community from '../community/Community'
import Offer from '../offer/Offer'
import {
  selectUser,
  selectUserCommunities,
  selectUserOffers,
} from './userSlice'

const User = () => {
  const params = useParams<{ webId: string }>()
  const webId = decodeURIComponent(params.webId)
  const user = useSelector((state: RootState) => selectUser(state, webId))
  const offers = useSelector((state: RootState) =>
    selectUserOffers(state, webId),
  )
  const communities = useSelector((state: RootState) =>
    selectUserCommunities(state, webId),
  )
  return (
    <div className="flex flex-col items-center gap-4">
      <header className="flex items-center gap-2">
        <h1 className="italic">
          Profile of <span className="not-italic">{user.name}</span>
        </h1>{' '}
        <a href={user.id}>
          <FaExternalLinkAlt className="text-xs text-gray-400 hover:text-gray-800" />
        </a>
      </header>
      {user.avatar && (
        <img
          className="w-56 max-h-56"
          src={user.avatar}
          alt={`image of ${user.name}`}
        />
      )}
      <p className="w-56 whitespace-pre-line text-justify">
        {user.about.en || (
          <span className="text-gray-500 italic">
            This user has no description
          </span>
        )}
      </p>

      <h2>Offers ({offers.length})</h2>
      <section>
        <ul className="flex flex-wrap gap-6 justify-center">
          {offers.map(offer => (
            <li key={offer.id}>
              <Offer offer={offer} />
            </li>
          ))}
        </ul>
      </section>

      <h2>Communities ({communities.length})</h2>
      <section>
        <ul className="flex flex-wrap gap-6 justify-center">
          {communities.map(community => (
            <li key={community.id}>
              <Community community={community} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default User
