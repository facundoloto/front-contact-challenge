//api to dto
const mapDtoToViewModel = (dto) => ({
    id: dto.id,
    name: dto.name,
    lastName: dto.lastName,
    email: dto.email,
    number: dto.number
});

export default mapDtoToViewModel;