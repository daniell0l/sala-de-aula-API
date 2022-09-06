import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"; 
import { VIdeo } from "./video";

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @OneToMany(() => VIdeo, video => video.room)
    videos: VIdeo[]
}