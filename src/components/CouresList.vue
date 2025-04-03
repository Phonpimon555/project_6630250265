<template>
    <div class="container">
      <h2>รายวิชา</h2>
  
      <div v-for="(year, yearKey) in courses" :key="yearKey">
        <h3>{{ yearKey }}</h3>
        <div v-for="(semester, semesterKey) in year" :key="semesterKey">
          <h4>{{ semesterKey }}</h4>
          <button class="btn btn-success mb-2" @click="showAddForm(yearKey, semesterKey)">➕ เพิ่มวิชา</button>
  
          <table class="table">
            <thead>
              <tr>
                <th>รหัสวิชา</th>
                <th>ชื่อวิชา</th>
                <th>หน่วยกิต</th>
                <th>เกรด</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in semester" :key="course.id">
                <td>{{ course.code }}</td>
                <td>{{ course.name }}</td>
                <td>{{ course.credits }}</td>
                <td>{{ course.grade }}</td>
                <td>
                  <button class="btn btn-warning btn-sm" @click="editCourse(yearKey, semesterKey, course)">✏️ แก้ไข</button>
                  <button class="btn btn-danger btn-sm" @click="deleteCourse(yearKey, semesterKey, course.id)">🗑️ ลบ</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- ฟอร์มเพิ่ม/แก้ไขรายวิชา -->
      <div v-if="showForm" class="card p-3 mt-3">
        <h4>{{ isEditing ? 'แก้ไขวิชา' : 'เพิ่มวิชาใหม่' }}</h4>
        <input v-model="form.code" placeholder="รหัสวิชา" class="form-control mb-2">
        <input v-model="form.name" placeholder="ชื่อวิชา" class="form-control mb-2">
        <input v-model="form.credits" placeholder="หน่วยกิต" type="number" class="form-control mb-2">
        <input v-model="form.grade" placeholder="เกรด" class="form-control mb-2">
        <button class="btn btn-primary" @click="saveCourse">{{ isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มวิชา' }}</button>
        <button class="btn btn-secondary ml-2" @click="cancelEdit">ยกเลิก</button>
      </div>
  
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        courses: {},
        showForm: false,
        isEditing: false,
        currentYear: '',
        currentSemester: '',
        form: { id: null, code: '', name: '', credits: '', grade: '' }
      };
    },
    mounted() {
      this.fetchCourses();
    },
    methods: {
      fetchCourses() {
        axios.get('http://localhost:3000/courses')
          .then(response => { this.courses = response.data; });
      },
      deleteCourse(year, semester, id) {
        this.courses[year][semester] = this.courses[year][semester].filter(course => course.id !== id);
        axios.put('http://localhost:3000/courses', this.courses);
      },
      showAddForm(year, semester) {
        this.currentYear = year;
        this.currentSemester = semester;
        this.isEditing = false;
        this.form = { id: Date.now(), code: '', name: '', credits: '', grade: '' };
        this.showForm = true;
      },
      editCourse(year, semester, course) {
        this.currentYear = year;
        this.currentSemester = semester;
        this.isEditing = true;
        this.form = { ...course };
        this.showForm = true;
      },
      saveCourse() {
        if (this.isEditing) {
          // แก้ไขข้อมูล
          const index = this.courses[this.currentYear][this.currentSemester].findIndex(c => c.id === this.form.id);
          this.courses[this.currentYear][this.currentSemester][index] = { ...this.form };
        } else {
          // เพิ่มข้อมูลใหม่
          this.courses[this.currentYear][this.currentSemester].push({ ...this.form });
        }
        axios.put('http://localhost:3000/courses', this.courses);
        this.showForm = false;
      },
      cancelEdit() {
        this.showForm = false;
      }
    }
  };
  </script>