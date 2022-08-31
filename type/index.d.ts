declare type Result<T> = {Ok:boolean,Msg?:string} & {[K in keyof T]?:T[K]}
declare type NextStaticPropsValue<T> = {props:{[K in keyof T]:T[K]},revalidate?:number} | {notFound:boolean}
declare type NextStaticPaths<T> = {paths:Array<{params:T}>,fallback:boolean | string}