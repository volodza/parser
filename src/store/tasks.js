export default {
    state:{
        tasks:[],
        monitored:[],
        ip:'localhost:3000/'
    },
    mutations:{
        setTasks(state,payload){
            state.tasks = payload
        },
        setMonitored(state,payload){
            state.monitored = payload
        }
    },
    actions:{},
    getters:{
        monitored(state){
            return state.monitored;
        },
        tasks(state){
            return state.tasks;
        },
        ip(state){
            return state.ip;
        }
    }
}