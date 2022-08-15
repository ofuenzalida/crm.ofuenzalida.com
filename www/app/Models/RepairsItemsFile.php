<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class RepairsItemsFile
 * 
 * @property int $id
 * @property string|null $name
 * @property string|null $file_path
 * @property int $users_id
 * @property int $properties_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Property $property
 * @property User $user
 *
 * @package App\Models
 */
class RepairsItemsFile extends Model
{
	use SoftDeletes;
	protected $table = 'repairs_items_files';

	protected $casts = [
		'users_id' => 'int',
		'properties_id' => 'int'
	];

	protected $fillable = [
		'name',
		'file_path',
		'users_id',
		'properties_id'
	];

	public function property()
	{
		return $this->belongsTo(Property::class, 'properties_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'users_id');
	}
}
