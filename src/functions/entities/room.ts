import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"; 
import { Subject } from "./subject";
import { VIdeo } from "./video";

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @Column()
    description: string

    @OneToMany(() => VIdeo, video => video.room)
    videos: VIdeo[]

    @ManyToMany(() => Subject, subject => subject.rooms)
    subjects: Subject[]
}