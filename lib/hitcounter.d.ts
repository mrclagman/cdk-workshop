import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
export interface HitCounterProps {
    downstream: lambda.IFunction;
    readCapacity: number;
}
export declare class HitCounter extends Construct {
    readonly handler: lambda.Function;
    readonly table: dynamodb.Table;
    constructor(scope: Construct, id: string, props: HitCounterProps);
}
