//api to dto
const mapDtoToViewModel = (dto) => ({
    id: dto.id,
    name: dto.name,
    lastName: dto.lastName,
    email: dto.email,
    phone: dto.number
});

export default mapDtoToViewModel;