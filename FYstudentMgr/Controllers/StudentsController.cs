using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using FYstudentMgr.Models;
using FYstudentMgr.Manager;
using System.Web.Routing;
using System.Web.Mvc;
using FYstudentMgr.ViewModels;

namespace FYstudentMgr.Controllers
{
    public class StudentsController : ApiController
    {
        private StudentManager studentManager = new StudentManager();
        
        // GET: api/Students
        public IQueryable<Student> GetStudents()
        {
            return studentManager.GetStudents();
        }

        // GET: api/Students?instructorId=5
        public IQueryable<Student> GetByWorker(int instructorId)
        {
            return studentManager.GetStudentsByPostId(instructorId);
        }


        // GET: api/Students?key=5
        public IQueryable<Student> GetByKey(string key)
        {
            
            if (key == null||key=="")
            {
                return null;
            }
            return studentManager.GetStudentsByKey(key);
        }

        // GET: api/Students?strQuery=""
        public IQueryable<Student> GetByFilter(string strQuery)
        {
            FilterIds idsList=Newtonsoft.Json.JsonConvert.DeserializeObject<FilterIds>(strQuery);
            return studentManager.GetStudentsByFilter(idsList);
        }


        // GET: api/Students/5
        [ResponseType(typeof(Student))]
        public async Task<IHttpActionResult> GetStudent(int id)
        {
            Student student = await studentManager.GetStudent(id);
            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }


        // GET: api/Students?introId=5  获取筛选项结构
        [ResponseType(typeof(StudentFilter))]
        public async Task<IHttpActionResult> GetFilter(int introId,bool foo)
        {  
            return Ok(await studentManager.GetFilterByPostId(introId));
        }


        // PUT: api/Students/5
        [ResponseType(typeof(Student))]
        public async Task<IHttpActionResult> PutStudent(int id, Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != student.Id)
            {
                return BadRequest();
            }
            try
            {
                await studentManager.Update(student);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!studentManager.StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(student); 
        }


       

        // POST: api/Students
        [ResponseType(typeof(Student))]
        public async Task<IHttpActionResult> PostStudent(Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            student = await studentManager.Add(student);
            return CreatedAtRoute("DefaultApi", new { id = student.Id }, student);
        }

        // DELETE: api/Students/5
        [ResponseType(typeof(Student))]
        public async Task<IHttpActionResult> DeleteStudent(int id)
        {
            Student student = await studentManager.Delete(id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                studentManager.Dispose();
            }
            base.Dispose(disposing);
        }

       
    }
}