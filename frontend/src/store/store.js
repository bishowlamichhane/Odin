import {create} from 'zustand'


const videoStore = create(set=>({

        loggedIn:false,
        setLoggedIn:()=>set(state=>({
            loggedIn:!state.loggedIn
        })),
        accessToken:"",
        setAccessToken:(accessToken)=>set({
            accessToken:accessToken
        })


}))

export default videoStore;