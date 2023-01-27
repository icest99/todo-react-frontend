import React, { ReactNode, FC} from 'react';
interface IComposeContext {
    //composeContext props will contains components and they are FC, FC can have children and its children will be ReactNode
    components?: FC<{children?: ReactNode}>[];
    children?: ReactNode | undefined;
}

export default function ComposeContext(props: IComposeContext) {

    const { components = [], children } = props;

    return <>
        {
            //acc = accumulator, Comp = components we're iterating
            components.reduceRight((acc, Comp: any) => {
                //return every components that we got from ComposeContext as a props, and created nested structure
                return <Comp>{acc}</Comp>
            }, children)
        }
    </>

    //react context nest structure
    //<components A>
        //<components B>
            //<components C>
            //</components C>
        //</components B>
    //</components A>
}