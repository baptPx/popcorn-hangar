import type IPoint from './IPoint'

export default interface IMap {
    fileName: string,
    title: string,
    description: string, 
    points: IPoint[],
    id: number
}