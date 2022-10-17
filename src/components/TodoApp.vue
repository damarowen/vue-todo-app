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
        v-on:keyup.enter="onEnter"
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
        <tr v-for="(task, index) in $store.state.tasks" :key="index">
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
              <span class="fa fa-trash pointer"></span>
            </div>
          </td>
          <td class="text-center">
            <div @click="editTask(index)">
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
    const defaultData = [
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
    ];
    if (this.$store.state.tasks.length == 0) {
      localStorage.setItem("TASKS", JSON.stringify(defaultData));
    }
    return {
      inputTaskBinding: "",
      editedTask: null,
      //*TASKS WILL GET FROM LOCAL STORAGE FIRST
    };
  },
  methods: {
    submitTask() {
      if (this.inputTaskBinding.length === 0) return;
      /* We need to update the task */
      if (this.editedTask != null) {
        //* replace edited task
        this.$store.state.tasks[this.editedTask].name = this.inputTaskBinding;
        this.editedTask = null;
      } else {
        /* We need to add new task */
        this.$store.commit("ADD_TASK", this.inputTaskBinding);
      }

      this.inputTaskBinding = "";
    },
    deleteTask(index) {
      this.$store.commit("DELETE_TASK", index);
    },
    editTask(index) {
      this.inputTaskBinding = this.$store.state.tasks[index].name;
      this.editedTask = index;
    },
    changeStatus(index) {
      this.$store.commit("TOGGLE_TASK", index);
    },
    capitalizeFirstChar(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    onEnter() {
      this.submitTask();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer {
  cursor: pointer;
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
