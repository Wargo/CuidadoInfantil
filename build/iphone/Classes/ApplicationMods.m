#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"tiviewshadow",@"name",@"ti.viewshadow",@"moduleid",@"0.3",@"version",@"03caadce-b6e4-414e-8dae-f24c855f0dd8",@"guid",@"",@"licensekey",nil]];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"ti.cloud",@"name",@"ti.cloud",@"moduleid",@"2.0.5",@"version",@"1056b5d2-2bb5-4339-b930-297637aeec4e",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end
