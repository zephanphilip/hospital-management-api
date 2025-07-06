import { ApiProperty } from "@nestjs/swagger";

export class SpecialNoteDto{
    @ApiProperty({example:'Health condition is too bad.'})
    specialNote:string;
}