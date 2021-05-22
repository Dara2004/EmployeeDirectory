using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace server.Models
{
    public partial class EmployeeDirectoryContext : DbContext
    {
        public EmployeeDirectoryContext()
        {
        }

        public EmployeeDirectoryContext(DbContextOptions<EmployeeDirectoryContext> options)
            : base(options)
        {
        }

        public virtual DbSet<LocationCompany> LocationCompanies { get; set; }
        public virtual DbSet<LocationGroup> LocationGroups { get; set; }
        public virtual DbSet<LocationOffice> LocationOffices { get; set; }
        public virtual DbSet<LocationPhysical> LocationPhysicals { get; set; }
        public virtual DbSet<Skill> Skills { get; set; }
        public virtual DbSet<SkillCategory> SkillCategories { get; set; }
        public virtual DbSet<Worker> Workers { get; set; }
        public virtual DbSet<CreateWorkerSkillDto> WorkerSkills { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<LocationCompany>(entity =>
            {
                entity.HasKey(e => e.CompanyCode)
                    .HasName("pkLocationCompany");

                entity.Property(e => e.CompanyCode).IsUnicode(false);

                entity.Property(e => e.Label).IsUnicode(false);

                entity.Property(e => e.ManagerWorkerNumber).IsUnicode(false);

                entity.HasOne(d => d.ManagerWorker)
                    .WithMany(p => p.LocationCompanies)
                    .HasForeignKey(d => d.ManagerWorkerNumber)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fkManagerCompany");
            });

            modelBuilder.Entity<LocationGroup>(entity =>
            {
                entity.HasKey(e => new { e.CompanyCode, e.OfficeCode, e.GroupCode })
                    .HasName("pkLocationGroup");

                entity.Property(e => e.CompanyCode).IsUnicode(false);

                entity.Property(e => e.OfficeCode).IsUnicode(false);

                entity.Property(e => e.GroupCode).IsUnicode(false);

                entity.Property(e => e.Label).IsUnicode(false);

                entity.Property(e => e.ManagerWorkerNumber).IsUnicode(false);

                entity.HasOne(d => d.ManagerWorker)
                    .WithMany(p => p.LocationGroups)
                    .HasForeignKey(d => d.ManagerWorkerNumber)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fkManagerGroup");

                entity.HasOne(d => d.LocationOffice)
                    .WithMany(p => p.LocationGroups)
                    .HasForeignKey(d => new { d.CompanyCode, d.OfficeCode })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fkOfficeGroup");
            });

            modelBuilder.Entity<LocationOffice>(entity =>
            {
                entity.HasKey(e => new { e.CompanyCode, e.OfficeCode })
                    .HasName("pkLocationOffice");

                entity.Property(e => e.CompanyCode).IsUnicode(false);

                entity.Property(e => e.OfficeCode).IsUnicode(false);

                entity.Property(e => e.Label).IsUnicode(false);

                entity.Property(e => e.ManagerWorkerNumber).IsUnicode(false);

                entity.HasOne(d => d.LocationCompany)
                    .WithMany(p => p.LocationOffices)
                    .HasForeignKey(d => d.CompanyCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fkCompanyOffice");

                entity.HasOne(d => d.ManagerWorker)
                    .WithMany(p => p.LocationOffices)
                    .HasForeignKey(d => d.ManagerWorkerNumber)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fkManagerOffice");
            });

            modelBuilder.Entity<LocationPhysical>(entity =>
            {
                entity.HasKey(e => e.PhysicalLocationId)
                    .HasName("pkLocationPhysical");

                entity.Property(e => e.PhysicalLocationId).IsUnicode(false);

                entity.Property(e => e.Label).IsUnicode(false);

                entity.Property(e => e.SortValue).IsUnicode(false);
            });

            modelBuilder.Entity<Skill>(entity =>
            {
                entity.HasKey(e => new { e.SkillCategoryId, e.SkillId })
                    .HasName("pkSkill");

                entity.Property(e => e.SkillCategoryId).IsUnicode(false);

                entity.Property(e => e.SkillId).IsUnicode(false);

                entity.Property(e => e.Label).IsUnicode(false);

                entity.Property(e => e.SortValue).IsUnicode(false);

                entity.HasOne(d => d.SkillCategory)
                    .WithMany(p => p.Skills)
                    .HasForeignKey(d => d.SkillCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fkSkillCategorySkill");
            });

            modelBuilder.Entity<SkillCategory>(entity =>
            {
                entity.Property(e => e.SkillCategoryId).IsUnicode(false);

                entity.Property(e => e.Label).IsUnicode(false);

                entity.Property(e => e.SortValue).IsUnicode(false);
            });

            modelBuilder.Entity<Worker>(entity =>
            {
                entity.HasKey(e => e.WorkerNumber)
                    .HasName("pkWorker");

                entity.Property(e => e.WorkerNumber).IsUnicode(false);

                entity.Property(e => e.CompanyCode).IsUnicode(false);

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.EmploymentType).IsUnicode(false);

                entity.Property(e => e.FirstName).IsUnicode(false);

                entity.Property(e => e.GroupCode).IsUnicode(false);

                entity.Property(e => e.LastName).IsUnicode(false);

                entity.Property(e => e.OfficeCode).IsUnicode(false);

                entity.Property(e => e.PhotoUrl).IsUnicode(false);

                entity.Property(e => e.PhysicalLocationId).IsUnicode(false);

                entity.Property(e => e.SupervisorWorkerNumber).IsUnicode(false);

                entity.Property(e => e.Title).IsUnicode(false);

                entity.Property(e => e.Type).IsUnicode(false);

                entity.Property(e => e.WorkCell).IsUnicode(false);

                entity.Property(e => e.WorkPhone).IsUnicode(false);

                entity.HasOne(d => d.PhysicalLocation)
                    .WithMany(p => p.Workers)
                    .HasForeignKey(d => d.PhysicalLocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fkPhysicalLocationWorker");

                entity.HasOne(d => d.SupervisorWorker)
                    .WithMany(p => p.InverseSupervisorWorkerNumberNavigation)
                    .HasForeignKey(d => d.SupervisorWorkerNumber)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fkSupervisorWorker");

                entity.HasOne(d => d.LocationGroup)
                    .WithMany(p => p.Workers)
                    .HasForeignKey(d => new { d.CompanyCode, d.OfficeCode, d.GroupCode })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fkGroupWorker");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId).HasName("pkUser");
                entity.Property(e => e.Username).IsUnicode(false);
            });

            modelBuilder.Entity<CreateWorkerSkillDto>(entity =>
            {
                entity.HasKey(e => new { e.WorkerNumber, e.SkillCategoryId, e.SkillId })
                    .HasName("pkWorkerSkill");

                entity.Property(e => e.WorkerNumber).IsUnicode(false);

                entity.Property(e => e.SkillCategoryId).IsUnicode(false);

                entity.Property(e => e.SkillId).IsUnicode(false);

                entity.Property(e => e.SkillLevel).IsUnicode(false);

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.WorkerSkills)
                    .HasForeignKey(d => d.WorkerNumber)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fkWorkerWorkerSkill");

                entity.HasOne(d => d.Skill)
                    .WithMany(p => p.WorkerSkills)
                    .HasForeignKey(d => new { d.SkillCategoryId, d.SkillId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fkSkillWorkerSkill");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
