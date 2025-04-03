<template>
    <div class="container">
      <h2>โปรไฟล์นิสิต</h2>
      <div v-for="student in students" :key="student.id" class="card p-3">
        <img :src="student.photo" class="img-thumbnail" width="150">
        <p><strong>ชื่อ:</strong> {{ student.name }}</p>
        <p><strong>รหัสนิสิต:</strong> {{ student.student_id }}</p>
        <p><strong>สาขา:</strong> {{ student.major }}</p>
        <p><strong>โรงเรียนเดิม:</strong> {{ student.school }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return { students: [] };
    },
    mounted() {
      axios.get('http://localhost:3000/students')
        .then(response => { this.students = response.data; });
    }
  };
  </script>