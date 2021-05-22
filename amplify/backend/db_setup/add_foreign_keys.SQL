ALTER TABLE LocationCompany
ADD CONSTRAINT fkManagerCompany
FOREIGN KEY (ManagerWorkerNumber) REFERENCES Worker(WorkerNumber);

ALTER TABLE LocationOffice
ADD CONSTRAINT fkManagerOffice
FOREIGN KEY (ManagerWorkerNumber) REFERENCES Worker(WorkerNumber);

ALTER TABLE LocationOffice
ADD CONSTRAINT fkCompanyOffice
FOREIGN KEY (CompanyCode) REFERENCES LocationCompany(CompanyCode);

ALTER TABLE LocationGroup
ADD CONSTRAINT fkManagerGroup
FOREIGN KEY (ManagerWorkerNumber) REFERENCES Worker(WorkerNumber);

ALTER TABLE LocationGroup
ADD CONSTRAINT fkOfficeGroup
FOREIGN KEY (CompanyCode, OfficeCode) REFERENCES LocationOffice(CompanyCode, OfficeCode);

ALTER TABLE Skill
ADD CONSTRAINT fkSkillCategorySkill
FOREIGN KEY (SkillCategoryId) REFERENCES SkillCategory(SkillCategoryId);

ALTER TABLE Worker
ADD CONSTRAINT fkGroupWorker
FOREIGN KEY (CompanyCode, OfficeCode, GroupCode) REFERENCES LocationGroup(CompanyCode, OfficeCode, GroupCode);

ALTER TABLE Worker
ADD CONSTRAINT fkSupervisorWorker
FOREIGN KEY (SupervisorWorkerNumber) REFERENCES Worker(WorkerNumber);

ALTER TABLE Worker
ADD CONSTRAINT fkPhysicalLocationWorker
FOREIGN KEY (PhysicalLocationId) REFERENCES LocationPhysical(PhysicalLocationId);

ALTER TABLE WorkerSkill
ADD CONSTRAINT fkWorkerWorkerSkill
FOREIGN KEY (WorkerNumber) REFERENCES Worker(WorkerNumber);

ALTER TABLE WorkerSkill
ADD CONSTRAINT fkSkillWorkerSkill
FOREIGN KEY (SkillCategoryId, SkillId) REFERENCES Skill(SkillCategoryId, SkillId);