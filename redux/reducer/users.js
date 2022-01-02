import {USERS_DATA_STATE_CHANGE,USERS_POST_STATE_CHANGE,CLEAR_DATA,USERS_LIKES_STATE_CHANGE} from '../constants/index'

const initialState={
    users:[],
    usersFollowingLoaded:0,
    feed:[]
}

export const users =(state=initialState,action)=>{
    
    switch(action.type){
        case USERS_DATA_STATE_CHANGE:
            return{
                ...state, 
                users:[...state.users,action.user]
            }
         case USERS_POST_STATE_CHANGE:
            return{
                ...state,
                usersFollowingLoaded:state.usersFollowingLoaded+1,
                // users:state.users.map(user=>user.uid===action.uid?
                //     {...user,posts:action.posts}:
                //     user
                //     )
                feed:[...state.feed, ...action.posts]
            }
        case USERS_LIKES_STATE_CHANGE:
            return {
                ...state,
                feed: state.feed.map(post => post.id == action.postId ? 
                    {...post, currentUserLike: action.currentUserLike} :
                    post)
            }
        case CLEAR_DATA:
            return initialState;
        default:
            return state
    }
    
}