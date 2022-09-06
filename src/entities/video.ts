import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room";

@Entity('videos')
export class VIdeo{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    url: string

    @ManyToOne(() => Room, room => room.videos)
    @JoinColumn({name: 'room_id'})
    room: Room
}

