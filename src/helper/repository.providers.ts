import { Category } from "src/category/entities/category.entity";
import { LabComment } from "src/comment/entities/comment.entity";
import { Competence } from "src/competence/entities/competence.entity";
import { Curriculum } from "src/curriculum/entities/curriculum.entity";
import { Lab } from "src/lab/entities/lab.entity";
import { LearnerLab } from "src/learner-lab/entities/learner-lab.entity";
import { Learner } from "src/learner/entities/learner.entity";
import { DataSource } from "typeorm";

export const labProviders = [
    {
      provide: 'LAB_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Lab),
      inject: ['DATA_SOURCE'],
    },
];
export const learnerProviders = [
    {
      provide: 'LEARNER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Learner),
      inject: ['DATA_SOURCE'],
    },
];
export const categoryProviders = [
    {
      provide: 'CATEGORY_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
      inject: ['DATA_SOURCE'],
    },
];
export const competenceProviders = [
    {
      provide: 'COMPETENCE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Competence),
      inject: ['DATA_SOURCE'],
    },
];
export const curriculumProviders = [
    {
      provide: 'CURRICULUM_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Curriculum),
      inject: ['DATA_SOURCE'],
    },
];
export const commentProviders = [
    {
      provide: 'COMMENT_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(LabComment),
      inject: ['DATA_SOURCE'],
    },
];
export const learnerLabProviders = [
    {
      provide: 'LEARNER_LAB_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(LearnerLab),
      inject: ['DATA_SOURCE'],
    },
];