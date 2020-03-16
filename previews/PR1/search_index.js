var documenterSearchIndex = {"docs":
[{"location":"index.html#FeatureSelector.jl-1","page":"Home","title":"FeatureSelector.jl","text":"","category":"section"},{"location":"index.html#","page":"Home","title":"Home","text":"Simple tool to select feature based on the statistical relationship between features to target variable. The currently implemented feature is based on:","category":"page"},{"location":"index.html#","page":"Home","title":"Home","text":"Correlation\nP-value, which can be obtained by either Chi-square or F test","category":"page"},{"location":"index.html#Quick-start-1","page":"Home","title":"Quick start","text":"","category":"section"},{"location":"index.html#","page":"Home","title":"Home","text":"julia> using RDatasets, FeatureSelector, DataFrames\n\njulia> boston = dataset(\"MASS\", \"Boston\");\n\njulia> selector = UnivariateFeatureSelector(k=5)\nUnivariateFeatureSelector(5, nothing)\n\njulia> select_features(\n           selector,\n           pearson_correlation,\n           boston[:, Not(:MedV)],\n           boston.MedV\n       )\n5-element Array{Symbol,1}:\n :LStat\n :Rm\n :PTRatio\n :Indus\n :Tax","category":"page"},{"location":"module.html#Module-1","page":"Module","title":"Module","text":"","category":"section"},{"location":"module.html#","page":"Module","title":"Module","text":"Feature selection has been one of the important steps in machine learning. Some of the advantages of feature selection are the performance increase and may prevent model to overfits.","category":"page"},{"location":"module.html#","page":"Module","title":"Module","text":"This technique selects features based on their importance, which is defined by how much impact does the feature have to the target variable. This package helps selecting the important features based on the correlation and p-value.","category":"page"},{"location":"module.html#Selectors-1","page":"Module","title":"Selectors","text":"","category":"section"},{"location":"module.html#Univariate-feature-selector-1","page":"Module","title":"Univariate feature selector","text":"","category":"section"},{"location":"module.html#","page":"Module","title":"Module","text":"Modules = [FeatureSelector]\nPages   = [\"UnivariateFeatureSelector.jl\"]\nFilter = t -> typeof(t) === DataType","category":"page"},{"location":"module.html#FeatureSelector.UnivariateFeatureSelector","page":"Module","title":"FeatureSelector.UnivariateFeatureSelector","text":"UnivariateFeatureSelector has the following fields:\n\nmethod::Function (required)- Method to calculate feature importance. The method chosen will determine the scoring. Below is the scring with available statistical method to obtain them.\nCorrelation - higher score means more important\npearson_correlation\nP-value - lower score means more important\nf_test\nchisq_test\nk::Union{Int64,Nothing} - Select top k features with the highest correlation to target variable. You could ignore this by specifying k == nothing. This defaults to nothing.\nthreshold::Union{Float64,Nothing} - Select features with correlation more than or equal to threshold. To ignore, simply set threshold to nothing (default behavior).\n\n\n\n\n\n","category":"type"},{"location":"module.html#Supported-method-1","page":"Module","title":"Supported method","text":"","category":"section"},{"location":"module.html#","page":"Module","title":"Module","text":"pearson_correlation\nf_test\nchisq_test","category":"page"},{"location":"module.html#FeatureSelector.pearson_correlation","page":"Module","title":"FeatureSelector.pearson_correlation","text":"function pearson_correlation(X_data::Matrix, y::Vector)\n\nCalculate pearson's correlation on X_data to y.\n\n\n\n\n\n","category":"function"},{"location":"module.html#FeatureSelector.f_test","page":"Module","title":"FeatureSelector.f_test","text":"function f_test(X_data::Matrix, y::Vector)\n\nCalculate p-value using f-test method.\n\n\n\n\n\n","category":"function"},{"location":"module.html#FeatureSelector.chisq_test","page":"Module","title":"FeatureSelector.chisq_test","text":"function chisq_test(X_data::Matrix, y::Vector)\n\nCalculate p-value using chi-square test.\n\n\n\n\n\n","category":"function"},{"location":"module.html#Select-feature-function-1","page":"Module","title":"Select feature function","text":"","category":"section"},{"location":"module.html#","page":"Module","title":"Module","text":"select_features","category":"page"},{"location":"module.html#FeatureSelector.select_features","page":"Module","title":"FeatureSelector.select_features","text":"function select_features(selector,\n                         X::DataFrame,\n                         y::Vector;\n                         verbose::Bool=false,\n                         return_val::Bool=false)\n\nSelect features based on the importance, which is defined by selector.method to target y. if verbose is true, logs will be printed - this defaults to false. If return_val is false, this function will return only the feature feature names, otherwise, tuple of selected feature names and the correlation value are returned.\n\nIf you have feature X_data as matrix and feature names X_features as a Vector, you can replace X with X_data and X_features (in this order).\n\nExample\n\njulia> using RDatasets, FeatureSelector, DataFrames\n\njulia> boston = dataset(\"MASS\", \"Boston\");\n\njulia> selector = UnivariateFeatureSelector(method=pearson_correlation, k=5)\nUnivariateFeatureSelector(pearson_correlation, 5, nothing)\n\njulia> select_features(\n           selector,\n           boston[:, Not(:MedV)],\n           boston.MedV\n       )\n5-element Array{Symbol,1}:\n :LStat\n :Rm\n :PTRatio\n :Indus\n :Tax\n\n\n\n\n\n\n","category":"function"},{"location":"module.html#Other-util-functions-1","page":"Module","title":"Other util functions","text":"","category":"section"},{"location":"module.html#","page":"Module","title":"Module","text":"Modules = [FeatureSelector]\nPages   = [\"utils.jl\"]","category":"page"},{"location":"module.html#FeatureSelector.one_hot_encode-Tuple{DataFrames.DataFrame}","page":"Module","title":"FeatureSelector.one_hot_encode","text":"function one_hot_encode(df::DataFrame;\n                        cols::Vector{Symbol}=Vector{Symbol}(),\n                        drop_original::Bool=false)\n\nUtility function to perform one-hot-encoding in DataFrame. This will add new columns with names <original_col_name>_<value>.\n\nFollowing options can be passed to modify behavior.\n\ncols - Vector of Symbol to specify which columns to be encoded. Defaults to empty, which means all features will be encoded.\ndrop_original - If true, this will drop the original feature set from resulting DataFrame. This defaults to false.\n\nExample\n\njulia> using RDatasets, FeatureSelector\n\njulia> titanic = dataset(\"datasets\", \"Titanic\");\n\njulia> first(one_hot_encode(titanic[:, [:Class, :Sex, :Age]]), 3)\n3×11 DataFrames.DataFrame. Omitted printing of 5 columns\n│ Row │ Class  │ Sex    │ Age    │ Class_1st │ Class_2nd │ Class_3rd │\n│     │ String │ String │ String │ Bool      │ Bool      │ Bool      │\n├─────┼────────┼────────┼────────┼───────────┼───────────┼───────────┤\n│ 1   │ 1st    │ Male   │ Child  │ 1         │ 0         │ 0         │\n│ 2   │ 2nd    │ Male   │ Child  │ 0         │ 1         │ 0         │\n│ 3   │ 3rd    │ Male   │ Child  │ 0         │ 0         │ 1         │\n\n\njulia> first(one_hot_encode(titanic[:, [:Class, :Sex, :Age]], cols=[:Class], drop_original=true), 3)\n3×6 DataFrames.DataFrame\n│ Row │ Sex    │ Age    │ Class_1st │ Class_2nd │ Class_3rd │ Class_Crew │\n│     │ String │ String │ Bool      │ Bool      │ Bool      │ Bool       │\n├─────┼────────┼────────┼───────────┼───────────┼───────────┼────────────┤\n│ 1   │ Male   │ Child  │ 1         │ 0         │ 0         │ 0          │\n│ 2   │ Male   │ Child  │ 0         │ 1         │ 0         │ 0          │\n│ 3   │ Male   │ Child  │ 0         │ 0         │ 1         │ 0          │\n\n\n\n\n\n","category":"method"}]
}
