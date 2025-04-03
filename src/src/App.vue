<template>
  <div>
    <h1>Student Profile</h1>
    <StudentProfile />
    <CourseList />
  </div>
</template>

<script>
import StudentProfile from './components/StudentProfile.vue';
import CourseList from './components/CourseList.vue';

export default {
  components: {
    StudentProfile,
    CourseList
  }
};
</script>