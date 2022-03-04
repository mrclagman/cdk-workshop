"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitCounter = void 0;
const lambda = require("aws-cdk-lib/aws-lambda");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const constructs_1 = require("constructs");
;
class HitCounter extends constructs_1.Construct {
    constructor(scope, id, props) {
        var _a;
        if (props.readCapacity !== undefined && (props.readCapacity < 5 || props.readCapacity > 20)) {
            throw new Error('readCapacity must be greater than 5 and less than 20');
        }
        super(scope, id);
        const table = new dynamodb.Table(this, 'Hits', {
            partitionKey: {
                name: 'path',
                type: dynamodb.AttributeType.STRING
            },
            encryption: dynamodb.TableEncryption.AWS_MANAGED,
            readCapacity: (_a = props.readCapacity) !== null && _a !== void 0 ? _a : 5
        });
        this.table = table;
        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        });
        // grant the lambda role read/write permissions to our table
        table.grantReadWriteData(this.handler);
        // grant the lambda role invoke permissions to the downstream function
        props.downstream.grantInvoke(this.handler);
    }
    ;
}
exports.HitCounter = HitCounter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpdGNvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaURBQWlEO0FBQ2pELHFEQUFxRDtBQUNyRCwyQ0FBdUM7QUFhdEMsQ0FBQztBQUVGLE1BQWEsVUFBVyxTQUFRLHNCQUFTO0lBUXJDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7O1FBQzVELElBQUcsS0FBSyxDQUFDLFlBQVksS0FBSyxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxFQUFDO1lBQ3ZGLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztTQUMzRTtRQUVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDM0MsWUFBWSxFQUFHO2dCQUNYLElBQUksRUFBRSxNQUFNO2dCQUNaLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDdEM7WUFDRCxVQUFVLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXO1lBQ2hELFlBQVksUUFBRSxLQUFLLENBQUMsWUFBWSxtQ0FBSSxDQUFDO1NBQ3hDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUMxRCxPQUFPLEVBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ3BDLE9BQU8sRUFBRyxvQkFBb0I7WUFDOUIsSUFBSSxFQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUN0QyxXQUFXLEVBQUc7Z0JBQ1Ysd0JBQXdCLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZO2dCQUN2RCxlQUFlLEVBQUUsS0FBSyxDQUFDLFNBQVM7YUFDbkM7U0FDSixDQUFDLENBQUM7UUFFSCw0REFBNEQ7UUFDNUQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2QyxzRUFBc0U7UUFDdEUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFBQSxDQUFDO0NBQ0w7QUExQ0QsZ0NBMENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcblxuZXhwb3J0IGludGVyZmFjZSBIaXRDb3VudGVyUHJvcHMge1xuICAgIC8qIHRoZSBmdW5jdGlvbiBmb3Igd2hpY2ggd2Ugd2FudCB0byBjb3VudCB1cmwgaGl0cyAqL1xuICAgIGRvd25zdHJlYW06IGxhbWJkYS5JRnVuY3Rpb247XG5cbiAgICAvKlxuICAgICAgICBUaGUgcmVhZCBjYXBhY2l0eSB1bml0cyBmb3IgdGhlIHRhYmxlXG4gICAgICAgIE11c3QgYmUgZ3JlYXRlciB0aGFuIDUgYW5kIGxvd2VyIHRoYW4gMjBcbiAgICAgICAgQGRlZmF1bHQgNVxuICAgICovXG5cbiAgICByZWFkQ2FwYWNpdHk6IG51bWJlclxufTtcblxuZXhwb3J0IGNsYXNzIEhpdENvdW50ZXIgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuXG4gICAgLyogYWxsb3dzIGFjY2Vzc2luZyB0aGUgY291bnRlciBmdW5jdGlvbiAqL1xuICAgIHB1YmxpYyByZWFkb25seSBoYW5kbGVyOiBsYW1iZGEuRnVuY3Rpb247XG5cbiAgICAvKiBoaXQgY291bnRlciB0YWJsZSAqL1xuICAgIHB1YmxpYyByZWFkb25seSB0YWJsZTogZHluYW1vZGIuVGFibGU7XG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogSGl0Q291bnRlclByb3BzKXtcbiAgICAgICAgaWYocHJvcHMucmVhZENhcGFjaXR5ICE9PSB1bmRlZmluZWQgJiYgKHByb3BzLnJlYWRDYXBhY2l0eSA8IDUgfHwgcHJvcHMucmVhZENhcGFjaXR5ID4gMjApKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncmVhZENhcGFjaXR5IG11c3QgYmUgZ3JlYXRlciB0aGFuIDUgYW5kIGxlc3MgdGhhbiAyMCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgICAgICBjb25zdCB0YWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnSGl0cycsIHtcbiAgICAgICAgICAgIHBhcnRpdGlvbktleSA6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAncGF0aCcsXG4gICAgICAgICAgICAgICAgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmNyeXB0aW9uOiBkeW5hbW9kYi5UYWJsZUVuY3J5cHRpb24uQVdTX01BTkFHRUQsXG4gICAgICAgICAgICByZWFkQ2FwYWNpdHk6IHByb3BzLnJlYWRDYXBhY2l0eSA/PyA1XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGFibGUgPSB0YWJsZTtcblxuICAgICAgICB0aGlzLmhhbmRsZXIgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdIaXRDb3VudGVySGFuZGxlcicsIHtcbiAgICAgICAgICAgIHJ1bnRpbWUgOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgICAgICAgIGhhbmRsZXIgOiAnaGl0Y291bnRlci5oYW5kbGVyJyxcbiAgICAgICAgICAgIGNvZGUgOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxuICAgICAgICAgICAgZW52aXJvbm1lbnQgOiB7XG4gICAgICAgICAgICAgICAgRE9XTlNUUkVBTV9GVU5DVElPTl9OQU1FOiBwcm9wcy5kb3duc3RyZWFtLmZ1bmN0aW9uTmFtZSxcbiAgICAgICAgICAgICAgICBISVRTX1RBQkxFX05BTUU6IHRhYmxlLnRhYmxlTmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBncmFudCB0aGUgbGFtYmRhIHJvbGUgcmVhZC93cml0ZSBwZXJtaXNzaW9ucyB0byBvdXIgdGFibGVcbiAgICAgICAgdGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKHRoaXMuaGFuZGxlcik7XG5cbiAgICAgICAgLy8gZ3JhbnQgdGhlIGxhbWJkYSByb2xlIGludm9rZSBwZXJtaXNzaW9ucyB0byB0aGUgZG93bnN0cmVhbSBmdW5jdGlvblxuICAgICAgICBwcm9wcy5kb3duc3RyZWFtLmdyYW50SW52b2tlKHRoaXMuaGFuZGxlcik7XG4gICAgfTtcbn0iXX0=