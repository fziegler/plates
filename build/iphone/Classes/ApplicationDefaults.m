/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"nZ5R5MAThkF028xwJmVVQjKuO7NF5d29"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"fdkMfQ3eMBUftUEO47xLNuENljI4PaoD"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"6xGfU465Pd8hmpMyflyMiLKNScqwX8JL"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"mW7VkrRrlh9defKdHtHzZ69RXyl4P1UJ"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"WrxfHC7iu3rfdR7fCB1RZZPXfuWfyldW"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"4nfgEoFsZeiGSMkIZmMrs74c1cqfo0bZ"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
