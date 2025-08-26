export abstract class SuperMapper<D,E>{
    abstract toEntity(d: D): E;
    abstract toDto(e: E): D;
    toDtos(entities: E[]): D[]{
        return entities.map((entity) => this.toDto(entity));
    }
    toEntities(dtos: D[]): E[]{
        return dtos.map((dto) => this.toEntity(dto));
    }

}