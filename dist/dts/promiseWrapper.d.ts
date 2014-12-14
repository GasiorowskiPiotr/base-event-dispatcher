declare module evilduck {
    class PromiseWrapper<T> {
        then(func: (T: any) => any): PromiseWrapper<any>;
        catch(func: (T: any) => any): PromiseWrapper<any>;
        finally(func: (T: any) => any): PromiseWrapper<any>;
    }
}
