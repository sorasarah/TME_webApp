cd [..path_to_dir..]/mySearchEngine &&
source ../mySearchEngineVEnv/bin/activate &&
python3 manage.py refreshOnSaleList >> ~/mySearchEngineLog &&
python3 manage.py refreshOnAvailableList >> ~/mySearchEngineLog &&
python3 manage.py refreshOnFishProductList >> ~/mySearchEngineLog &&
deactivate
