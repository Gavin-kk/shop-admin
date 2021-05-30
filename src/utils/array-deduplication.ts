// eslint-disable-next-line @typescript-eslint/ban-types
export const deduplication = <T extends object, U extends keyof T> (
  list:T[],
  accordingTo:U, // 根据谁来去重 谁是重复的
):string[] => {
  const obj:any = {};
  list.forEach((item: T) => {
    obj[item[accordingTo]] = item[accordingTo];
  });
  return Object.keys(obj);
};
