import { SuperMapper } from "src/helper/super.mapper";
import { Competence } from "../entities/competence.entity";
import { CreateCompetenceDto } from "./create-competence.dto";
import { UpdateCompetenceDto } from "./update-competence.dto";

export class CompetenceMapper extends SuperMapper<UpdateCompetenceDto, Competence> {
    toEntity(createCompetenceDto: UpdateCompetenceDto): Competence {
        const competence = new Competence();
        competence.id = createCompetenceDto.id;
        competence.name = createCompetenceDto.name;
        competence.description = createCompetenceDto.description;
        return competence;
    }

    toDto(competence: Competence): UpdateCompetenceDto {
        const createCompetenceDto = new UpdateCompetenceDto();
        createCompetenceDto.name = competence.name;
        createCompetenceDto.description = competence.description;
        createCompetenceDto.createdAt = competence.createdAt;
        createCompetenceDto.id = competence.id;
        return createCompetenceDto;
    }
    
    
}