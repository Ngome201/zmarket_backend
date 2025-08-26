import { SuperMapper } from "src/helper/super.mapper";
import { Curriculum } from "../entities/curriculum.entity";
import { CreateCurriculumDto } from "./create-curriculum.dto";
import { UpdateCurriculumDto } from "./update-curriculum.dto";

export class CurriculumMapper extends SuperMapper<UpdateCurriculumDto, Curriculum> {
    toEntity(createCurriculumDto: UpdateCurriculumDto): Curriculum {
        const curriculum = new Curriculum();
        curriculum.id = createCurriculumDto.id;
        curriculum.name = createCurriculumDto.name;
        curriculum.description = createCurriculumDto.description;
        return curriculum;
    }

    toDto(curriculum: Curriculum): UpdateCurriculumDto {
        const createCurriculumDto = new UpdateCurriculumDto();
        createCurriculumDto.name = curriculum.name;
        createCurriculumDto.description = curriculum.description;
        createCurriculumDto.createdAt = curriculum.createdAt;
        createCurriculumDto.id = curriculum.id;
        return createCurriculumDto;
    }
}   
