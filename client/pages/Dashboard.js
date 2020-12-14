/**
 * This page displays student management information for specialists.
 * @author Justin Gray (A00426753) - the whole file
 */
import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { useRouter } from "next/router";
import CustomButton from "./components/CustomButton";
import axios from "axios";
import defaults from "../utils/defaults";
import DashboardStudent from "./components/DashboardStudent";
import DashboardForm from "./components/DashboardForm";
import PageTitle from "./components/PageTitle";

export default function Dashboard() {
  const router = useRouter();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${defaults.serverUrl}/specialist/students`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.error(err);
        setStudents(null);
      });
  }, []);

  /**
   * Delete a student account
   * @param {String} s_id which account to delete
   */
  function deleteStudent(s_id) {
    const token = localStorage.getItem("token");
    const copy = JSON.parse(JSON.stringify(students));

    axios
      .delete(`${defaults.serverUrl}/specialist/student/${s_id}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then(() => {
        setStudents(copy.filter((stud) => stud._id !== s_id));
      })
      .catch((err) => {
        console.error(err);
        window.alert("Could not delete the student account");
      });
  }

  /**
   * Add a created student account to the display list
   * @param {Object} student the student to add
   */
  function addStudent(student) {
    const copy = JSON.parse(JSON.stringify(students));
    copy.push(student);
    setStudents(copy);
  }

  let content;
  if (students === null) {
    content = (
      <div>
        <strong>Could not load contacts.</strong>
      </div>
    );
  } else if (students.length === 0) {
    content = (
      <div>
        <strong>No managed students.</strong>
      </div>
    );
  } else {
    console.log(students);
    content = students.map((s) => (
      <DashboardStudent
        student={s}
        key={s._id}
        remove={() => deleteStudent(s._id)}
      />
    ));
  }

  return (
    <Layout>
      <br />
      <div>
        <PageTitle title="DASHBOARD" />
      </div>
      <br />
      <strong>Managed Students:</strong>
      {content}
      <hr />
      <DashboardForm addStudent={addStudent} />
      <hr />
      <CustomButton
        label="Back"
        onClick={() => router.back()}
        type="button"
        disabled={false}
      />
    </Layout>
  );
}
