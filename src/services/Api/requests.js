import { create, deletion, find, update } from './Api'
import Cookies from 'js-cookie'
import API_BASE_URL from '../config/index'

const consent = async () =>
	await find('/consent', false)
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))
const authorize = async (data) =>
	await create(data, `/authorize`, false)
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const getCurrentUser = async () =>
	await find('/signin', true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const getFeedContent = async (
	current_user_id,
	endpoint = `/users/${current_user_id}`
) =>
	await find(endpoint, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const getMostLikedPost = async (endpoint = `/posts?most_liked=true`) =>
	await find(endpoint, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const searchPosts = async (
	searchValue,
	endpoint = `/posts?content=${searchValue}`
) =>
	await find(endpoint, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const searchUsers = async (
	searchValue,
	endpoint = `/users?email=${searchValue}`
) =>
	await find(endpoint, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const getUsers = async (endpoint = `/users`) =>
	await find(endpoint, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const getMostRecentPost = async (endpoint = `/posts`) =>
	await find(endpoint, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const getPost = async (post_id) =>
	await find(`/posts/${post_id}`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const getReactions = async () =>
	await find(`/reactions`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))
const getHobbies = async () =>
	await find(`/hobbies`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const getSkills = async () =>
	await find(`/skills`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const getFollows = async () =>
	await find(`/follows`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const getTags = async () =>
	await find(`/tags`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const likePost = async (id_post) =>
	await create(
		{
			id_post: id_post,
		},
		'/likes',
		true,
		Cookies.get('jwt_token')
	)
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const unLikePost = async (id_like) =>
	await deletion(`/likes/${id_like}`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 204) {
				return { data: 'success', status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const follow = async (data) =>
	await create(data, '/follows', true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const unFollow = async (id_follow) =>
	await deletion(`/follows/${id_follow}`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 204) {
				return { data: 'success', status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const commentPost = async (data) =>
	await create(data, `/comments`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const tagPost = async (data) =>
	await create(data, `/post_tags`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const deleteComment = async (comment_id) =>
	await deletion(
		`/comments/${comment_id}`,
		true,
		Cookies.get('jwt_token')
	).then(async (res) => {
		const status = res.status
		if (status === 204) {
			return { data: 'success', status: status }
		} else {
			return { data: null, status: status }
		}
	})

const deletePost = async (post_id) =>
	await deletion(`/posts/${post_id}`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 204) {
				return { data: 'success', status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const reactToPost = async (data) =>
	await create(data, `/post_reactions`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const addUserHobby = async (data) =>
	await create(data, `/user_hobbies`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const deleteUserHobby = async (user_hobby_id) =>
	await deletion(
		`/user_hobbies/${user_hobby_id}`,
		true,
		Cookies.get('jwt_token')
	)
		.then(async (res) => {
			const status = res.status
			if (status === 204) {
				return { data: 'success', status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const addExperience = async (data) =>
	await create(data, `/experiences`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const deleteExperience = async (experience_id) =>
	await deletion(
		`/experiences/${experience_id}`,
		true,
		Cookies.get('jwt_token')
	)
		.then(async (res) => {
			const status = res.status
			if (status === 204) {
				return { data: 'success', status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const addUserSkill = async (data) =>
	await create(data, `/user_skills`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const post = async (data) =>
	await create(data, `/posts`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const deleteUserSkill = async (user_skill_id) =>
	await deletion(
		`/user_skills/${user_skill_id}`,
		true,
		Cookies.get('jwt_token')
	)
		.then(async (res) => {
			const status = res.status
			if (status === 204) {
				return { data: 'success', status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const userUpdate = async (data, userId) =>
	await update(data, `/users/${userId}`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const uploadFile = async (data) => {
	const headers = { Authorization: `Bearer ${Cookies.get('jwt_token')}` }
	const options = { method: 'POST', body: data, headers }
	return await fetch(API_BASE_URL + '/images', options)
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))
}

const getChats = async () =>
	await find(`/chats`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const getChat = async (id_chat) =>
	await find(`/chats/${id_chat}`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

const createMessage = async (data) =>
	await create(data, `/chats`, true, Cookies.get('jwt_token'))
		.then(async (res) => {
			const status = res.status
			if (status === 200) {
				return { data: await res.json(), status: status }
			} else {
				return { data: null, status: status }
			}
		})
		.catch((error) => ({ data: null, status: 500 }))

export {
	getCurrentUser,
	getFeedContent,
	searchPosts,
	searchUsers,
	getMostLikedPost,
	getMostRecentPost,
	getPost,
	getReactions,
	getSkills,
	getFollows,
	getHobbies,
	getUsers,
	likePost,
	unLikePost,
	follow,
	unFollow,
	commentPost,
	deleteComment,
	reactToPost,
	userUpdate,
	addExperience,
	deleteExperience,
	addUserHobby,
	deleteUserHobby,
	addUserSkill,
	deleteUserSkill,
	deletePost,
	uploadFile,
	post,
	getChats,
	getChat,
	createMessage,
	getTags,
	tagPost,
	consent,
	authorize,
}
