export default class Step{
    constructor(config){
        this.navigationTitle = config.navigationTitle
        this.buttonTitle = config.buttonTitle
        this.pagePath = config.pagePath
    }

    getNavigationTitle()
    {
        return this.navigationTitle
    }

    getButtonTitle()
    {
        return this.buttonTitle
    }

    getPagePath()
    {
        return this.pagePath
    }
}