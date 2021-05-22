ALTER TABLE LocationCompany DROP CONSTRAINT fkManagerCompany;
ALTER TABLE LocationOffice DROP CONSTRAINT fkManagerOffice;
ALTER TABLE LocationOffice DROP CONSTRAINT fkCompanyOffice;
ALTER TABLE LocationGroup DROP CONSTRAINT fkManagerGroup;
ALTER TABLE LocationGroup DROP CONSTRAINT fkOfficeGroup;
-- ALTER TABLE LocationGroup DROP CONSTRAINT fkCompanyGroup;
ALTER TABLE Skill DROP CONSTRAINT fkSkillCategorySkill;
ALTER TABLE Worker DROP CONSTRAINT fkGroupWorker;
-- ALTER TABLE Worker DROP CONSTRAINT fkOfficeWorker;
-- ALTER TABLE Worker DROP CONSTRAINT fkCompanyWorker;
ALTER TABLE Worker DROP CONSTRAINT fkSupervisorWorker;
ALTER TABLE Worker DROP CONSTRAINT fkPhysicalLocationWorker;
ALTER TABLE WorkerSkill DROP CONSTRAINT fkWorkerWorkerSkill;
-- ALTER TABLE WorkerSkill DROP CONSTRAINT fkSkillCategoryWorkerSkill;
ALTER TABLE WorkerSkill DROP CONSTRAINT fkSkillWorkerSkill;

