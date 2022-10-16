<template>
  <div class="container" style="max-width: 600px">
    <!-- Heading -->
    <h2 class="text-center mt-5">My Vue Todo App</h2>

    <!-- Input -->
    <div class="d-flex mt-5">
      <input
        type="text"
        placeholder="Enter task"
        class="w-100 form-control"
        v-model="inputTaskBinding"
      />
      <button class="btn btn-warning rounded-0" @click="submitTask">
        SUBMIT
      </button>
    </div>

    <!-- Task table -->
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col" style="width: 120px">Status</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>
      <!-- v-for is for loop in vue, :key is index  -->
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>
            <span :class="{ 'line-through': task.status === 'finished' }">
              {{ task.name }}
            </span>
          </td>
          <td>
            <!-- ini dibawah ada class binding inline dengan span -->
         <span
              class="pointer noselect"
              @click="changeStatus(index)"
              :class="{
                'text-danger': task.status === 'to-do',
                'text-success': task.status === 'finished',
                'text-warning': task.status === 'in-progress',
              }" 
            >
              {{ capitalizeFirstChar(task.status) }}
            </span>
          </td>
          <td class="text-center">
            <div @click="deleteTask(index)">
              <span class="fa fa-trash pointer" ></span>
            </div>
          </td>
          <td class="text-center">
            <div  @click="editTask(index)">
              <p class="fa fa-pen pointer"></p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TodoApp",
  props: {
    msg: String,
  },
  data() {
    return {
      statuses: ["to-do", "in-progress", "finished"],
      /* Status could be: 'to-do' / 'in-progress' / 'finished' */
      inputTaskBinding: "",
      editedTask: null,
      tasks: [
        {
          name: "Steal bananas from the supermarket.",
          status: "to-do",
        },
        {
          name: "Eat 1 kg chocolate in 1 hour.",
          status: "in-progress",
        },
        {
          name: "Create YouTube video.",
          status: "finished",
        },
      ],
    };
  },
  methods: {
    submitTask(){
      if(this.inputTaskBinding.length === 0) return

       /* We need to update the task */
       if (this.editedTask != null) {
        this.tasks[this.editedTask].name = this.inputTaskBinding;
        this.editedTask = null;
      } else {
        /* We need to add new task */
        this.tasks.push({
          name: this.inputTaskBinding,
          status: "to-do",
        });
      }
     

      this.inputTaskBinding = ""
    },
    deleteTask(index){
      this.tasks.splice(index,1)
    },
    editTask(index){
      this.inputTaskBinding = this.tasks[index].name
      this.editedTask = index
    },
    changeStatus(index) {
      //if new todo, status ini index ke berapa sih
      //indexOf will return integer (1,2 or 3)
      //this.statuses.indexOf("to-d0") will return 0
      console.log(index, "indexnya")
      console.log(this.statuses.indexOf(this.tasks[index].status))
      let newIndex = this.statuses.indexOf(this.tasks[index].status);
      console.log(newIndex,"<<<1")
      if (++newIndex > 2) newIndex = 0; //index maksimal 2, dan increment var newIndex
      console.log(newIndex,"<<<2")
      this.tasks[index].status = this.statuses[newIndex];
    },
    capitalizeFirstChar(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.pointer {
  cursor: pointer
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.line-through {
  text-decoration: line-through;
}
</style>
