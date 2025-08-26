import { CreateLabDto } from './create-lab.dto';
import { Lab } from '../entities/lab.entity';
import { SuperMapper } from 'src/helper/super.mapper';
import { UpdateLabDto } from './update-lab.dto';

export class LabMapper extends SuperMapper<UpdateLabDto,Lab> {
    toEntity(d: UpdateLabDto): Lab {
        const lab = new Lab();
        lab.id = d.id;
        lab.name = d.name;
        lab.description = d.description;
        lab.mdFileUrl = d.mdFileUrl;
        lab.durationUnit = d.durationUnit;
        lab.duration = d.duration;
        lab.objectives = d.objectives;
        lab.prerequisites = d.prerequisites;
        lab.technologies = d.technologies;
        lab.score = d.score;
        lab.level = d.level;
        lab.disponibility = d.disponibility;
        lab.categoryId = String(d.category.id);

        return lab;

    }
    toDto(e: Lab): UpdateLabDto {
        const lab = new UpdateLabDto();
        lab.name = e.name;
        lab.description = e.description;
        lab.mdFileUrl = e.mdFileUrl;
        lab.durationUnit = e.durationUnit;
        lab.duration = e.duration;
        lab.objectives = e.objectives;
        lab.prerequisites = e.prerequisites;
        lab.technologies = e.technologies;
        lab.score = e.score;
        lab.level = e.level;
        lab.disponibility = e.disponibility;
        lab.categoryId = e.categoryId;
        lab.createdAt = e.createdAt;
        lab.id = e.id;
        // lab.competences = e.competences.map((competence) => {
        //     return {
        //         id: competence.id,
        //         name: competence.name,
        //         description: competence.description
        //     };
        // });
        // lab.category = {
        //     id: e.category.id,
        //     name: e.category.name,
        //     description: e.category.description
        // };
        return lab;    

    }
    
}