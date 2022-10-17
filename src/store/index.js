import {
    createStore
} from 'vuex'

export default createStore({
    state: {
        tasks: JSON.parse(localStorage.getItem("TASKS")) ?? [],
        statuses: ["to-do", "in-progress", "finished"],
        /* Status could be: 'to-do' / 'in-progress' / 'finished' */
    },
    mutations: {
        ADD_TASK(state, task) {
            let newData = [{
                name: task,
                status: "to-do",
            }, ...state.tasks];
            localStorage.setItem("TASKS", JSON.stringify(newData));
            state.tasks = JSON.parse(localStorage.getItem("TASKS"));
        },
        DELETE_TASK(state, task) {
            state.tasks.splice(task, 1)
            let newData = state.tasks;
            localStorage.setItem("TASKS", JSON.stringify(newData));
            state.tasks = JSON.parse(localStorage.getItem("TASKS"));
        },
        TOGGLE_TASK(state, index) {
            //if new todo, status ini index ke berapa sih
            //indexOf will return integer (1,2 or 3)
            //this.statuses.indexOf("to-d0") will return 0
            //   console.log(index, "indexnya")
            //   console.log(state.statuses.indexOf(state.tasks[index].status))
            let newIndex = state.statuses.indexOf(state.tasks[index].status);
            //console.log(newIndex,"<<<1")
            if (++newIndex > 2) newIndex = 0; //index maksimal 2, dan increment var newIndex
            //console.log(newIndex,"<<<2")
            state.tasks[index].status = state.statuses[newIndex];
            let newData = state.tasks;
            localStorage.setItem("TASKS", JSON.stringify(newData));
            state.tasks = JSON.parse(localStorage.getItem("TASKS"));
        },
    },
})