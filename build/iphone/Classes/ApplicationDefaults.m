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

    [_property setObject:[TiUtils stringValue:@"Da5lDhcxJye9RDTwhf3YRVTFODjLF5NC"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"Ez2FIDGvF4gIckeNN9OXQeMc6TD4rqCj"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"uUuty7LxA7LQrHwWVp6n5rYwKCzHWmsd"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"Ur7NMdeoIRT2AYEBw9Ckls1rWmBEIri9"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"bYkmx1L3EP6GyGDuzh5Cikkmo0EoDMEE"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"ftVw3ONVccDlGEnFIWYlFOfcDA3k0f8N"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
