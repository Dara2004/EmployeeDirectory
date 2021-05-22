using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class ChangeFieldNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LocationPhysical",
                columns: table => new
                {
                    PhysicalLocationId = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    Label = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    SortValue = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pkLocationPhysical", x => x.PhysicalLocationId);
                });

            migrationBuilder.CreateTable(
                name: "SkillCategory",
                columns: table => new
                {
                    SkillCategoryId = table.Column<string>(type: "varchar(32)", unicode: false, maxLength: 32, nullable: false),
                    Label = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    SortValue = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkillCategory", x => x.SkillCategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Skill",
                columns: table => new
                {
                    SkillCategoryId = table.Column<string>(type: "varchar(32)", unicode: false, maxLength: 32, nullable: false),
                    SkillId = table.Column<string>(type: "varchar(32)", unicode: false, maxLength: 32, nullable: false),
                    Label = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    SortValue = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pkSkill", x => new { x.SkillCategoryId, x.SkillId });
                    table.ForeignKey(
                        name: "fkSkillCategorySkill",
                        column: x => x.SkillCategoryId,
                        principalTable: "SkillCategory",
                        principalColumn: "SkillCategoryId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LocationOffice",
                columns: table => new
                {
                    CompanyCode = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: false),
                    OfficeCode = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: false),
                    Label = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    ManagerWorkerNumber = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pkLocationOffice", x => new { x.CompanyCode, x.OfficeCode });
                });

            migrationBuilder.CreateTable(
                name: "Worker",
                columns: table => new
                {
                    WorkerNumber = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    CompanyCode = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: false),
                    OfficeCode = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: false),
                    GroupCode = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: false),
                    LastName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    FirstName = table.Column<string>(type: "varchar(25)", unicode: false, maxLength: 25, nullable: true),
                    EmploymentType = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    Title = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    HireDate = table.Column<DateTime>(type: "date", nullable: true),
                    TerminationDate = table.Column<DateTime>(type: "date", nullable: true),
                    SupervisorWorkerNumber = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    YearsPriorExperience = table.Column<decimal>(type: "numeric(3,1)", nullable: true),
                    Email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    WorkPhone = table.Column<string>(type: "varchar(24)", unicode: false, maxLength: 24, nullable: true),
                    WorkCell = table.Column<string>(type: "varchar(24)", unicode: false, maxLength: 24, nullable: true),
                    PhysicalLocationId = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    PhotoUrl = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    Type = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pkWorker", x => x.WorkerNumber);
                    table.ForeignKey(
                        name: "fkPhysicalLocationWorker",
                        column: x => x.PhysicalLocationId,
                        principalTable: "LocationPhysical",
                        principalColumn: "PhysicalLocationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fkSupervisorWorker",
                        column: x => x.SupervisorWorkerNumber,
                        principalTable: "Worker",
                        principalColumn: "WorkerNumber",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LocationCompany",
                columns: table => new
                {
                    CompanyCode = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: false),
                    Label = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    ManagerWorkerNumber = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pkLocationCompany", x => x.CompanyCode);
                    table.ForeignKey(
                        name: "fkManagerCompany",
                        column: x => x.ManagerWorkerNumber,
                        principalTable: "Worker",
                        principalColumn: "WorkerNumber",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LocationGroup",
                columns: table => new
                {
                    CompanyCode = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: false),
                    OfficeCode = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: false),
                    GroupCode = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: false),
                    Label = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    ManagerWorkerNumber = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pkLocationGroup", x => new { x.CompanyCode, x.OfficeCode, x.GroupCode });
                    table.ForeignKey(
                        name: "fkManagerGroup",
                        column: x => x.ManagerWorkerNumber,
                        principalTable: "Worker",
                        principalColumn: "WorkerNumber",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fkOfficeGroup",
                        columns: x => new { x.CompanyCode, x.OfficeCode },
                        principalTable: "LocationOffice",
                        principalColumns: new[] { "CompanyCode", "OfficeCode" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkerSkill",
                columns: table => new
                {
                    WorkerNumber = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    SkillCategoryId = table.Column<string>(type: "varchar(32)", unicode: false, maxLength: 32, nullable: false),
                    SkillId = table.Column<string>(type: "varchar(32)", unicode: false, maxLength: 32, nullable: false),
                    SkillLevel = table.Column<string>(type: "varchar(12)", unicode: false, maxLength: 12, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pkWorkerSkill", x => new { x.WorkerNumber, x.SkillCategoryId, x.SkillId });
                    table.ForeignKey(
                        name: "fkSkillWorkerSkill",
                        columns: x => new { x.SkillCategoryId, x.SkillId },
                        principalTable: "Skill",
                        principalColumns: new[] { "SkillCategoryId", "SkillId" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fkWorkerWorkerSkill",
                        column: x => x.WorkerNumber,
                        principalTable: "Worker",
                        principalColumn: "WorkerNumber",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LocationCompany_ManagerWorkerNumber",
                table: "LocationCompany",
                column: "ManagerWorkerNumber");

            migrationBuilder.CreateIndex(
                name: "IX_LocationGroup_ManagerWorkerNumber",
                table: "LocationGroup",
                column: "ManagerWorkerNumber");

            migrationBuilder.CreateIndex(
                name: "IX_LocationOffice_ManagerWorkerNumber",
                table: "LocationOffice",
                column: "ManagerWorkerNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Worker_CompanyCode_OfficeCode_GroupCode",
                table: "Worker",
                columns: new[] { "CompanyCode", "OfficeCode", "GroupCode" });

            migrationBuilder.CreateIndex(
                name: "IX_Worker_PhysicalLocationId",
                table: "Worker",
                column: "PhysicalLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Worker_SupervisorWorkerNumber",
                table: "Worker",
                column: "SupervisorWorkerNumber");

            migrationBuilder.CreateIndex(
                name: "IX_WorkerSkill_SkillCategoryId_SkillId",
                table: "WorkerSkill",
                columns: new[] { "SkillCategoryId", "SkillId" });

            migrationBuilder.AddForeignKey(
                name: "fkCompanyOffice",
                table: "LocationOffice",
                column: "CompanyCode",
                principalTable: "LocationCompany",
                principalColumn: "CompanyCode",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fkManagerOffice",
                table: "LocationOffice",
                column: "ManagerWorkerNumber",
                principalTable: "Worker",
                principalColumn: "WorkerNumber",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fkGroupWorker",
                table: "Worker",
                columns: new[] { "CompanyCode", "OfficeCode", "GroupCode" },
                principalTable: "LocationGroup",
                principalColumns: new[] { "CompanyCode", "OfficeCode", "GroupCode" },
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fkManagerCompany",
                table: "LocationCompany");

            migrationBuilder.DropForeignKey(
                name: "fkManagerGroup",
                table: "LocationGroup");

            migrationBuilder.DropForeignKey(
                name: "fkManagerOffice",
                table: "LocationOffice");

            migrationBuilder.DropTable(
                name: "WorkerSkill");

            migrationBuilder.DropTable(
                name: "Skill");

            migrationBuilder.DropTable(
                name: "SkillCategory");

            migrationBuilder.DropTable(
                name: "Worker");

            migrationBuilder.DropTable(
                name: "LocationGroup");

            migrationBuilder.DropTable(
                name: "LocationPhysical");

            migrationBuilder.DropTable(
                name: "LocationOffice");

            migrationBuilder.DropTable(
                name: "LocationCompany");
        }
    }
}
