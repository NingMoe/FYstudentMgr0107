using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using FYstudentMgr.Models;

namespace FYstudentMgr.Controllers
{
    public class DiplomasController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Diplomas
        public IQueryable<Diploma> GetDiplomas()
        {
            return db.Diplomas;
        }

        // GET: api/Diplomas/5
        [ResponseType(typeof(Diploma))]
        public async Task<IHttpActionResult> GetDiploma(int id)
        {
            Diploma diploma = await db.Diplomas.FindAsync(id);
            if (diploma == null)
            {
                return NotFound();
            }

            return Ok(diploma);
        }

        // PUT: api/Diplomas/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDiploma(int id, Diploma diploma)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != diploma.Id)
            {
                return BadRequest();
            }

            db.Entry(diploma).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiplomaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Diplomas
        [ResponseType(typeof(Diploma))]
        public async Task<IHttpActionResult> PostDiploma(Diploma diploma)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Diplomas.Add(diploma);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = diploma.Id }, diploma);
        }

        // DELETE: api/Diplomas/5
        [ResponseType(typeof(Diploma))]
        public async Task<IHttpActionResult> DeleteDiploma(int id)
        {
            Diploma diploma = await db.Diplomas.FindAsync(id);
            if (diploma == null)
            {
                return NotFound();
            }

            db.Diplomas.Remove(diploma);
            await db.SaveChangesAsync();

            return Ok(diploma);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DiplomaExists(int id)
        {
            return db.Diplomas.Count(e => e.Id == id) > 0;
        }
    }
}