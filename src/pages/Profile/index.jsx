import React, { useState, useEffect, useRef } from 'react'
import Fade from 'react-reveal/Fade'
import Pulse from 'react-reveal/Pulse'
import { useSelector } from 'react-redux'
import ActionBar from '../../components/ActionBar/index'
import Navbar from '../../components/navbar/Navbar/index'
import ProfileSection from './ProfileSection/index'
import FormEditUser from '../../components/forms/FormEditUser/index'
import ProfileDeleteSection from './ProfileDeleteSection/index'
import ProfileCoverSection from './ProfileCoverSection/index'
import PublicInformations from './PublicInformations/index'
import { getFeedContent } from '../../services/Api/requests'
import LoaderSpinner from '../../components/LoaderSpinner/index'
import ErrorPage from '../ErrorPage'
import FormNewExperience from '../../components/forms/FormNewExperience/index'
import FormNewSkill from '../../components/forms/FormNewSkill/index'
import FormNewHobby from '../../components/forms/FormNewHobby/index'
import { useParams } from 'react-router-dom'

const Profile = () => {
	const modalTargetRef = useRef(null)
	const { user_id } = useParams()
	const [status, setStatus] = useState('loading')
	const current_user = useSelector((state) => state.current_user)
	const [userData, setUserData] = useState(null)
	const [isAmmendable, setIsAmmendable] = useState(false)
	const [followers, setFollowers] = useState(null)
	const [follows, setFollows] = useState(null)
	const [currentUserFollow, setCurrentUserFollow] = useState(null)

	useEffect(() => {
		if (followers) {
			const currentUserFollow = followers.find(
				(follow) => follow.id_follower === current_user.id
			)
			currentUserFollow
				? setCurrentUserFollow(currentUserFollow)
				: setCurrentUserFollow(null)

			setUserData({ ...userData, followers: followers })
		}
	}, [followers])

	useEffect(() => {
		const fetchData = async (user_id) => {
			const { data, status } = await getFeedContent(user_id)
			if (status === 200) {
				setUserData(data)
				setFollowers(data.followers)
				setFollows(data.follows)
				setStatus(200)
			} else {
				setStatus(status)
			}
		}
		current_user && fetchData(user_id)
	}, [user_id, current_user])

	return status === 200 && userData ? (
		<div
			className='bg-light relative'
			style={{ paddingTop: '5.5rem' }}
			ref={modalTargetRef}
		>
			<Navbar modalTarget={modalTargetRef} />

			<div className='container bg-white shadow p-0 p-lg-4'>
				<Fade top>
					<ProfileCoverSection
						data={userData.user}
						isAmmendable={isAmmendable}
					/>

					<PublicInformations
						followers={followers}
						follows={follows}
						currentUserFollow={currentUserFollow}
						data={userData.user}
						setIsAmmendable={setIsAmmendable}
						isAmmendable={isAmmendable}
						setNewFollow={(newFollow) =>
							setFollowers([...followers, newFollow[0]])
						}
						deleteFollow={(oldFollow) =>
							setFollowers(followers.filter((e) => e.id !== oldFollow.id))
						}
					/>
				</Fade>

				{isAmmendable && (
					<FormEditUser
						data={userData.user}
						setUserData={(newUserData) =>
							setUserData({ ...userData, user: newUserData })
						}
					/>
				)}

				<Pulse>
					<ProfileSection
						sectionHeader={isAmmendable ? 'Mes Posts' : 'Posts'}
						data={userData.posts}
						itemType={'posts'}
						isAmmendable={isAmmendable}
					/>
				</Pulse>

				<Pulse>
					<ProfileSection
						sectionHeader={isAmmendable ? 'Mes Commentaires' : 'Commentaires'}
						data={userData.comments}
						itemType={'comments'}
						isAmmendable={isAmmendable}
					/>
				</Pulse>

				<Pulse>
					<ProfileSection
						sectionHeader={
							isAmmendable
								? 'Mes Experiences professionnelles'
								: 'Experiences professionnelles'
						}
						data={userData.experiences}
						itemType={'experiences-pros'}
						isAmmendable={isAmmendable}
					/>
				</Pulse>
				{isAmmendable && (
					<FormNewExperience
						setNewExperience={(newExperience) =>
							setUserData({
								...userData,
								experiences: [...userData.experiences, newExperience],
							})
						}
					/>
				)}
				<Pulse>
					<ProfileSection
						sectionHeader={isAmmendable ? 'Mes Compétences' : 'Compétences'}
						data={userData.skills}
						itemType={'skills'}
						isAmmendable={isAmmendable}
					/>
				</Pulse>
				{isAmmendable && (
					<FormNewSkill
						setNewSkill={(newSkill) =>
							setUserData({
								...userData,
								skills: [...userData.skills, newSkill],
							})
						}
					/>
				)}
				<Pulse>
					<ProfileSection
						sectionHeader={isAmmendable ? 'Mes Passions' : 'Passions'}
						data={userData.hobbies}
						itemType={'hobbies'}
						isAmmendable={isAmmendable}
					/>
				</Pulse>
				{isAmmendable && (
					<FormNewHobby
						setNewHobby={(newHobby) =>
							setUserData({
								...userData,
								hobbies: [...userData.hobbies, newHobby],
							})
						}
					/>
				)}

				{isAmmendable && <ProfileDeleteSection />}
			</div>

			<ActionBar />
		</div>
	) : status === 'loading' ? (
		<LoaderSpinner style={{ height: '100%' }} />
	) : (
		<ErrorPage status={status} />
	)
}

export default Profile
