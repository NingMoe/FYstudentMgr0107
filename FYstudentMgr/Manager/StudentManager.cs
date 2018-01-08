using FYstudentMgr.Models;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FYstudentMgr.ViewModels;
using FYstudentMgr.Manager;
using System.Threading.Tasks;
namespace FYstudentMgr.Manager
{
    public class StudentManager
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        /// <summary>
        /// 获取所有学生
        /// </summary>
        /// <returns></returns>
        public IQueryable<Student> GetStudents()
        {
            return db.Students;
        }
        /// <summary>
        /// 根据id获取一个学生
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Student> GetStudent(int id)
        {
            return await db.Students.FindAsync(id); 
        }
        /// <summary>
        /// 根据岗位id查找该岗位及其下属岗位经手的学生信息
        /// </summary>
        /// <param name="postId">岗位id</param>
        /// <returns></returns>
        public IQueryable<Student> GetStudentsByPostId(int postId)
        {
            var students = db.Students.Include(s => s.School)
                            .Where(s => getPostIdsByPostId(postId).Contains(s.Signer.PostId));
            return students;
        }
        /// <summary>
        /// 根据关键字搜索学生
        /// </summary>
        /// <param name="key">搜索关键字</param>
        /// <returns></returns>
        public IQueryable<Student> GetStudentsByKey(string key)
        {

            return db.Students
                .Where(s => s.IdCardNO == key || s.Name == key || s.QQ == key || s.MobilePhoneNO == key);
        }
        /// <summary>
        /// 根据筛选器筛选学生
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public IQueryable<Student> GetStudentsByFilter(FilterIds filter)
        {

            var students = GetStudentsByPostId(filter.introId);
            if (students == null)
            {
                return null;
            }
            if (filter.gradeIds.Count > 0)
            {
                students = students.Where(s => filter.gradeIds.Contains(s.Grade));
            }
            if (filter.introIds.Count > 0)
            {
                students = students.Where(s => filter.introIds.Contains(s.Signer.PostId));
            }
            if (filter.majorIds.Count > 0)
            {
                students = students.Where(s => filter.majorIds.Contains((int)s.Major));
            }
            if (filter.eduIds.Count > 0)
            {
                students = students.Where(s => filter.eduIds.Contains((int)s.Education));
            }
            if (filter.schoolIds.Count > 0)
            {
                students = students.Where(s => filter.schoolIds.Contains(s.SchoolID));
            }
            return students;
        }

        /// <summary>
        /// 根据postid查询筛选标签
        /// </summary>
        /// <param name="postId">岗位id</param>
        /// <returns></returns>
        public async Task<StudentFilter> GetFilterByPostId(int postId)
        {
            var students = GetStudentsByPostId(postId);
            StudentFilter filter = new StudentFilter();
            filter.schools =await students.Select(s => new SchoolModel()
            {
                id = s.SchoolID,
                schoolName = s.School.SchoolName,
                selected = false
            }).Distinct().ToListAsync();
            filter.grades = await students.Select(s => new GradeModel()
            {
                id = s.Grade,
                gradeName = s.Grade + "级",
                selected = false
            }).Distinct().ToListAsync();
            filter.majors = await students.Select(s => new MajorModel()
            {
                id = (int)s.Major,
                majorName = s.Major.ToString(),
                selected = false
            }).Distinct().ToListAsync();
            filter.educations = await students.Select(s => new EducationModel()
            {
                id = (int)s.Education,
                educationName = s.Education.ToString(),
                selected = false
            }).Distinct().ToListAsync();
            filter.intros = await students.Select(s => new IntroModel()
            {
                id = s.Signer.Worker.Id,
                introName = s.Signer.Worker.Name,
                selected = false
            }).Distinct().ToListAsync();
            return filter;
        }
        /// <summary>
        /// 更新学生
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        public async Task<int> Update(Student student)
        {
            db.Entry(student).State = EntityState.Modified;
            return await db.SaveChangesAsync();
        }
        /// <summary>
        /// 增加学生
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        public async Task<Student> Add(Student student)
        {
            db.Students.Add(student);
            await db.SaveChangesAsync();
            return student;
        }
        /// <summary>
        /// 删除学生
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Student> Delete(int id)
        {
            Student student = await db.Students.FindAsync(id);
            if (student == null)
            {
                return null;
            }
            db.Students.Remove(student);
            await db.SaveChangesAsync();
            return student;
        }
        /// <summary>
        /// 检查学生是否存在
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool StudentExists(int id)
        {
            return db.Students.Count(e => e.Id == id) > 0;
        }

        public void Dispose()
        {
            db.Dispose();
        }

        #region utils工具
        /// <summary>
        /// 根据postid返回该岗位下属的所有岗位id
        /// </summary>
        /// <param name="postId"></param>
        /// <returns></returns>
        private IEnumerable<int> getPostIdsByPostId(int postId)
        {
            var postManager = new PostManager();
            var intorIds = postManager.GetSons(postId).Select(s => s.Id);
            return intorIds;
        }
        /// <summary>
        /// 根据postid获取下属的所有指定角色的岗位id
        /// </summary>
        /// <param name="postId">岗位id</param>
        /// <param name="roleName">角色名称</param>
        /// <returns></returns>
        private IEnumerable<int> getPostIdsByPostId(int postId,string roleName)
        {
            var postManager = new PostManager();
            var intorIds = postManager.GetSons(postId).Where(s=>s.Role.Name== roleName).Select(s => s.Id);
            return intorIds;
        }

        //private IQueryable<Student> getStudent
        #endregion
    }
}